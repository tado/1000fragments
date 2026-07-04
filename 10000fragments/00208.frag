uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.73;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.52)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 13.95 - t * 4.65 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.02;
	p *= 2.68;
	{ p = vec2(atan(p.y, p.x) * 2.05, length(p) * 5.46 - time * 0.21); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.95, 0.70, 0.96) * (0.22 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.22 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

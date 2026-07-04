uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.03;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.55)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.24 - t * 6.70 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.84;
	{ p = vec2(atan(p.y, p.x) * 1.02, length(p) * 5.89 - time * 0.74); }
	p = (floor(p * 8.0) + 0.5) / 8.0;
	p *= 1.0 + 0.38 * sin(time * 3.77);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.57, 0.35, 0.79) * (0.14 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

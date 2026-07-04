uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.07;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.94)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 19.83 - t * 3.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = sin(p * 2.20 + time * 2.03) * 1.49;
	p = (floor(p * 13.2) + 0.5) / 13.2;
	{ p = vec2(atan(p.y, p.x) * 1.11, length(p) * 2.29 - time * 0.91); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.17 + time * 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

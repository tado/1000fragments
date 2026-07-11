uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.96;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.95)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 12.53 - t * 4.07 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.43;
	{ p = vec2(atan(p.y, p.x) * 2.57, length(p) * 3.30 - time * 0.43); }
	p = fract(p * 1.28) - 0.5;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	p = rot2(time * -0.31) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.19, vec3(0.48, 0.43, 0.54), vec3(0.45, 0.35, 0.39), vec3(0.99, 0.93, 1.12), vec3(0.85, 0.50, 0.90));
	col = fract(col * 1.76);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

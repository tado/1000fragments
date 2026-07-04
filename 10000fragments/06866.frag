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
    vec2 zp = p * 8.88;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 0.89)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 11.00 - t * 4.37 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.03;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.36) * p * 12.21;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.08, length(hf));
	vec3 col = palette(d * 0.88 + time * 0.12, vec3(0.47, 0.60, 0.47), vec3(0.36, 0.34, 0.47), vec3(0.74, 1.01, 0.75), vec3(0.45, 0.14, 0.61)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

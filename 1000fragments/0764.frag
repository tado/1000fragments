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
    vec2 zp = p * 3.38;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.27)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 13.90 - t * 6.31 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.69) * p * 21.27;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.75;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 0.50 + time * 0.21, vec3(0.51, 0.59, 0.59), vec3(0.31, 0.48, 0.45), vec3(1.15, 0.82, 1.11), vec3(0.94, 0.53, 0.93)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

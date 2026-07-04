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
    vec2 zp = p * 4.99;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.37)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 12.78 - t * 6.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.13;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.08) * p * 21.19;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 0.56 + time * 0.00, vec3(0.57, 0.57, 0.53), vec3(0.30, 0.39, 0.37), vec3(0.99, 0.73, 0.84), vec3(0.40, 0.18, 0.72)) * v;
	col = mod(col * 1.49, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

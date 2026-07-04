uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 17.93 - t * 2.11 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 39.68 - t * 2.45 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.41;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.44) * p * 17.05;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.91 + time * 0.27, vec3(0.40, 0.56, 0.53), vec3(0.41, 0.50, 0.43), vec3(1.18, 0.71, 1.27), vec3(0.58, 0.88, 0.61)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

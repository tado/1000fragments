uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.37;
    v = 0.5 * (sin(6.0 * cp.x + t * 0.67) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 2.60) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.28) * p * 16.56;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.52;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = palette(d * 1.12 + time * 0.27, vec3(0.57, 0.49, 0.55), vec3(0.44, 0.37, 0.43), vec3(0.90, 1.28, 0.83), vec3(0.45, 0.80, 0.01)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

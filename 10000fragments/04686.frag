uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 27.65 - t * 6.48 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 27.84 - t * 6.48 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * -3.86 + time * 0.45) * p;
	p = fract(p * 1.06) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.52 + time * 0.09, vec3(0.40, 0.54, 0.48), vec3(0.48, 0.39, 0.43), vec3(1.20, 0.92, 0.85), vec3(0.55, 0.79, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

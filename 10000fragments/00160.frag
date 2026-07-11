uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.91 + t * 1.81 + ph) + sin(p.y * 5.57 - t * 3.55 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.89;
	p = fract(p * 1.62) - 0.5;
	p = rot2(0.43) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.47 + time * 0.16, vec3(0.56, 0.50, 0.50), vec3(0.34, 0.30, 0.47), vec3(1.09, 1.07, 1.35), vec3(0.86, 0.64, 0.84));
	col = mod(col * 2.77, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

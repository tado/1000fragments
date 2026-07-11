uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.56 + t * 4.88 + ph) + sin(p.y * 5.43 - t * 4.88 + ph)
        + sin((p.x + p.y) * 7.66 + t * 4.88 + ph) + sin(length(p) * 5.83 - t * 4.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	p = rot2(time * 0.78) * p;
	p = rot2(1.93) * p;
	p *= 2.99;
	p = abs(p) - 0.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.16, vec3(0.54, 0.53, 0.51), vec3(0.47, 0.38, 0.34), vec3(1.06, 0.72, 0.73), vec3(0.16, 0.19, 0.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

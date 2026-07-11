uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.86 + t * 1.84 + ph) + sin(p.y * 12.55 - t * 1.84 + ph)
        + sin((p.x + p.y) * 8.09 + t * 1.84 + ph) + sin(length(p) * 15.56 - t * 1.84 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.77;
	p += vec2(-0.46, -0.20) * sin(length(p) * 5.69 - time * 0.84) * 0.38;
	p = rot2(p.y * 3.14 + time * 0.23) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.07, vec3(0.54, 0.48, 0.46), vec3(0.42, 0.42, 0.33), vec3(1.06, 0.74, 0.97), vec3(0.53, 0.90, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

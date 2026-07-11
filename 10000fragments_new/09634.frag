uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.99 + t * 0.66 + ph) + sin(p.y * 6.42 - t * 0.66 + ph)
        + sin((p.x + p.y) * 9.96 + t * 0.66 + ph) + sin(length(p) * 7.82 - t * 0.66 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.15;
	p *= 2.49;
	p = abs(p);
	p = rot2(p.y * -3.20 + time * 0.39) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.50 + time * 0.22, vec3(0.51, 0.49, 0.54), vec3(0.41, 0.49, 0.40), vec3(0.81, 0.90, 0.84), vec3(0.08, 0.03, 0.20));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

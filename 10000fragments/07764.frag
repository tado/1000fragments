uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 2.81 + t * 3.53 + ph) + sin(p.y * 10.98 - t * 3.53 + ph)
        + sin((p.x + p.y) * 2.69 + t * 3.53 + ph) + sin(length(p) * 10.91 - t * 3.53 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	p = rot2(p.y * 1.15 + time * 0.19) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.48 + time * 0.05, vec3(0.53, 0.60, 0.52), vec3(0.39, 0.38, 0.40), vec3(1.01, 1.37, 1.39), vec3(0.71, 0.99, 0.54));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

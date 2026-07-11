uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.98 + t * 2.88 + ph) + sin(p.y * 3.14 - t * 2.88 + ph)
        + sin((p.x + p.y) * 6.31 + t * 2.88 + ph) + sin(length(p) * 3.58 - t * 2.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	p = rot2(time * 1.24) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.23 + time * 0.28, vec3(0.42, 0.45, 0.52), vec3(0.42, 0.45, 0.30), vec3(0.93, 1.38, 1.18), vec3(0.03, 0.36, 0.51));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

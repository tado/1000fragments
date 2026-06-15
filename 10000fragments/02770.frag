uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.74 + vec2(t * 2.50, -t * 2.50) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.48;
	p += vec2(0.44, 0.93) * sin(length(p) * 4.75 - time * 1.05) * 0.17;
	p = rot2(p.y * -2.48 + time * 0.66) * p;
	p = rot2(length(p) * 3.34 + time * 0.74) * p;
	p = rot2(2.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.38 + time * 0.12, vec3(0.57, 0.46, 0.52), vec3(0.48, 0.31, 0.41), vec3(0.92, 0.83, 1.32), vec3(0.91, 0.91, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 10.27 + sin(p.y * 4.85 + t * 2.16) * 3.31 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * 1.93 + time * 0.43) * p;
	p += vec2(-0.94, -0.77) * sin(length(p) * 5.60 - time * 0.57) * 0.15;
	p *= 1.91;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.93 + time * 0.12, vec3(0.51, 0.57, 0.55), vec3(0.40, 0.49, 0.43), vec3(1.00, 0.95, 1.02), vec3(0.57, 0.14, 0.61));
	col = fract(col * 1.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

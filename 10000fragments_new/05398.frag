uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 21.91 - t * 8.69 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 7.5) + 0.5) / 7.5;
	p = rot2(1.08) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.12, vec3(0.53, 0.44, 0.50), vec3(0.50, 0.49, 0.42), vec3(0.74, 0.78, 1.32), vec3(0.35, 0.35, 0.16));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

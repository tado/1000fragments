uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.37 - t * 3.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	p += vec2(-0.92, -0.67) * sin(length(p) * 3.89 - time * 2.41) * 0.33;
	p = rot2(length(p) * 2.75 + time * 0.85) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.91 + time * 0.28, vec3(0.54, 0.54, 0.55), vec3(0.32, 0.38, 0.42), vec3(0.77, 1.34, 1.40), vec3(0.04, 0.17, 0.43));
	col = mod(col * 2.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

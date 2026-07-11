uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.06 - t * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	p = rot2(p.y * -3.19 + time * 0.17) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.10, vec3(0.58, 0.45, 0.52), vec3(0.39, 0.40, 0.37), vec3(0.78, 0.89, 0.94), vec3(0.37, 0.83, 0.05));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

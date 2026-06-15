uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.14 - t * 3.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p);
	p = rot2(length(p) * -3.57 + time * 0.94) * p;
	p *= 1.81;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.58 + time * 0.22, vec3(0.41, 0.58, 0.52), vec3(0.43, 0.45, 0.37), vec3(0.99, 0.97, 0.76), vec3(0.10, 0.83, 0.29));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

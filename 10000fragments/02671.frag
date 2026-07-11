uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.24 * cos(sa * 4 + t * 1.15 + ph);
    v = sin((sr - petal) * 15.39);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.52;
	p = abs(p) - 0.59;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.57 + time * 0.24, vec3(0.44, 0.41, 0.45), vec3(0.45, 0.40, 0.47), vec3(1.37, 0.86, 1.06), vec3(0.22, 0.57, 0.42));
	col = fract(col * 1.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

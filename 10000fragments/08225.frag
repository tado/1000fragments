uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.24 * cos(sa * 6 + t * 1.31 + ph);
    v = sin((sr - petal) * 18.15);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.89 + time * 0.23, vec3(0.55, 0.41, 0.53), vec3(0.40, 0.49, 0.49), vec3(0.81, 1.33, 1.08), vec3(0.55, 0.81, 0.43));
	col = fract(col * 1.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

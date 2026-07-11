uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.17 * cos(sa * 6 + t * 1.77 + ph);
    v = sin((sr - petal) * 15.26);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.96;
	p = fract(p * 2.97) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.06, vec3(0.53, 0.50, 0.45), vec3(0.35, 0.44, 0.46), vec3(0.74, 1.40, 1.29), vec3(0.35, 0.75, 0.15));
	col = fract(col * 2.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

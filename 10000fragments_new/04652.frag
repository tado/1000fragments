uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.66 + 0.28 * cos(sa * 8.0 + t * 1.90 + ph);
    v = sin((sr - petal) * 12.83);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.29, vec3(0.45, 0.59, 0.57), vec3(0.33, 0.35, 0.33), vec3(1.20, 0.76, 0.91), vec3(0.79, 0.89, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

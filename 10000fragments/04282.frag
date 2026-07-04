uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.28 * cos(sa * 3.0 + t * 1.00 + ph);
    v = sin((sr - petal) * 18.20);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.23, vec3(0.59, 0.47, 0.41), vec3(0.36, 0.44, 0.32), vec3(1.18, 0.87, 1.38), vec3(0.62, 0.31, 0.53));
	col = fract(col * 1.66);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

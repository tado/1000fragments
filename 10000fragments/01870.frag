uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.04 + sr * 6.97 - t * 0.68 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.01, vec3(0.41, 0.45, 0.49), vec3(0.36, 0.32, 0.41), vec3(0.73, 0.84, 1.13), vec3(0.95, 0.61, 0.21));
	col = mod(col * 2.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

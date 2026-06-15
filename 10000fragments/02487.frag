uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.07 + sr * 18.11 - t * 4.79 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.63 + time * 0.12, vec3(0.47, 0.56, 0.50), vec3(0.35, 0.31, 0.49), vec3(0.77, 1.00, 0.87), vec3(0.79, 0.57, 0.03));
	col = mod(col * 2.90, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

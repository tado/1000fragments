uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.47 + sr * 19.20 - t * 3.62 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.32;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.17, vec3(0.53, 0.59, 0.49), vec3(0.33, 0.40, 0.50), vec3(0.93, 1.04, 1.28), vec3(0.17, 0.87, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

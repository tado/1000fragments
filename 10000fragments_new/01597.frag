uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.99 + sr * 5.31 - t * 3.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.66;
	p.y += sin(p.x * 3.47 + time * 2.32) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.10, vec3(0.40, 0.55, 0.60), vec3(0.48, 0.48, 0.42), vec3(1.29, 0.79, 1.22), vec3(0.87, 0.19, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

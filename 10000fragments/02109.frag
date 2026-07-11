uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.39 + sr * 19.19 - t * 0.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.44;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.50 + time * 0.11, vec3(0.48, 0.42, 0.57), vec3(0.48, 0.48, 0.50), vec3(1.06, 1.26, 1.27), vec3(0.95, 0.27, 0.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

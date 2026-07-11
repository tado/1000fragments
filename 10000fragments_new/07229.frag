uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 33.97 - t * 1.17 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.56 + vec2(t * 2.14, -t * 2.65) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.15;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.93);
	float d = d1 * d2;
	vec3 col = palette(d * 1.44 + time * 0.11, vec3(0.52, 0.52, 0.41), vec3(0.48, 0.37, 0.47), vec3(1.18, 0.81, 0.91), vec3(0.59, 0.46, 0.68));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

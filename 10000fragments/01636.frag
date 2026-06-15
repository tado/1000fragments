uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 28.93 - t * 3.59 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 22.59 - t * 3.59 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.56;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.84 + time * 0.13, vec3(0.42, 0.54, 0.42), vec3(0.38, 0.40, 0.30), vec3(1.01, 0.99, 1.18), vec3(0.34, 0.29, 0.09));
	col = mod(col * 2.90, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

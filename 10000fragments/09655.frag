uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 15.58 - t * 4.65 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 37.07 - t * 4.65 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.99;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.74 + time * 0.01, vec3(0.42, 0.43, 0.60), vec3(0.43, 0.42, 0.33), vec3(0.98, 1.22, 1.34), vec3(0.10, 0.60, 0.03));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

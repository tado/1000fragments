uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 31.69 - t * 5.48 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 13.01 - t * 6.56 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	p.x += sin(p.y * 2.67 + time * 1.08) * 0.12;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.26 + time * 0.09, vec3(0.54, 0.52, 0.51), vec3(0.37, 0.40, 0.48), vec3(0.84, 1.39, 0.96), vec3(0.56, 0.16, 0.29));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

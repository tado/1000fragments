uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.44, 0.0)) * 21.51 - t * 6.03 + ph);
    float mb = sin(length(p + vec2(0.44, 0.0)) * 38.39 - t * 6.60 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	p += vec2(-0.05, -0.17) * sin(length(p) * 3.03 - time * 0.86) * 0.39;
	p = (floor(p * 20.8) + 0.5) / 20.8;
	p = fract(p * 2.96) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.00, vec3(0.56, 0.51, 0.58), vec3(0.42, 0.48, 0.44), vec3(1.17, 0.88, 1.27), vec3(0.56, 0.22, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

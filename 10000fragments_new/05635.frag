uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 37.49 - t * 6.61 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 15.15 - t * 2.29 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 7.1) + 0.5) / 7.1;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.75 + time * 0.02, vec3(0.50, 0.51, 0.53), vec3(0.35, 0.31, 0.41), vec3(0.71, 0.84, 0.98), vec3(0.21, 0.75, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 30.22 - t * 4.90 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 20.60 - t * 4.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.77;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.69 + time * 0.09, vec3(0.47, 0.41, 0.43), vec3(0.42, 0.40, 0.36), vec3(1.01, 0.97, 1.19), vec3(0.21, 0.75, 0.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

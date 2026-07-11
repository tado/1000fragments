uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 23.30 - t * 7.95 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 8.90 - t * 7.95 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.54;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.70 + time * 0.25);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

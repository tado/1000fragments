uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 12.93 - t * 1.24 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 15.35 - t * 1.24 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.92 + time * 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

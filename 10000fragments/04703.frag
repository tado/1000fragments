uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.28, 0.0)) * 32.44 - t * 7.03 + ph);
    float mb = sin(length(p + vec2(0.28, 0.0)) * 11.06 - t * 7.03 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.43) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.55 + time * 0.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

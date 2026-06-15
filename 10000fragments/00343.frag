uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 16.82 - t * 4.55 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 37.87 - t * 4.55 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	p = fract(p * 2.86) - 0.5;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.75 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

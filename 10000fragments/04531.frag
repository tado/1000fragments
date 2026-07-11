uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.47, 0.0)) * 35.97 - t * 6.31 + ph);
    float mb = sin(length(p + vec2(0.47, 0.0)) * 39.57 - t * 6.31 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.42 + time * 0.21);
	col = mod(col * 1.45, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

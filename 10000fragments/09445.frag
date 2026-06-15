uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 13.46 - t * 4.21 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 13.37 - t * 4.21 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.72 + time * 0.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

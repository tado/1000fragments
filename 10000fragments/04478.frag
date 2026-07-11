uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 37.16 - t * 5.92 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 35.18 - t * 5.92 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.58 + time * 0.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

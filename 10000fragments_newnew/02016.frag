uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.04 + ga * 4.0 - t * 1.57 + ph);
    v = arm * exp(-gr * 1.15);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.07;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.48 + time * 0.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

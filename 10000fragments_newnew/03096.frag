uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.71 + ga * 2.0 - t * 2.08 + ph);
    v = arm * exp(-gr * 0.68);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.50, 1.35, 0.68) + vec3(0.13, 0.02, 0.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

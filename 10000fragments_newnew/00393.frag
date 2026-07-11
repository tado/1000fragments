uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.50 + ga * 5.0 - t * 2.84 + ph);
    v = arm * exp(-gr * 1.37);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.04));
	col = 0.5 + 0.5 * col;
	col *= 0.85 + 0.17 * sin(gl_FragCoord.y * 1.27 + time * 13.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

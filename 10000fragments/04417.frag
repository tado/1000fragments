uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 25.34 - t * 5.05 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 10.20 - t * 5.05 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.46));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

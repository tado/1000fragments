uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.37 + sin(p.y * 5.46 + t * 0.79) * 3.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.73 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.30, 0.36, 0.23), vec3(0.90, 0.54, 0.68), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.51));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.45 + sr * 14.76 - t * 1.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.50, 0.13, 0.39), vec3(0.98, 0.85, 0.53), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

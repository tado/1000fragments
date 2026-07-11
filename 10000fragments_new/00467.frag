uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.15 * cos(sa * 3.0 + t * 2.67 + ph);
    v = sin((sr - petal) * 7.84);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 mc = p * (1.04 + 0.44 * sin(t * 1.23)) + vec2(-0.61, -0.29) + 0.02 * vec2(sin(ph), cos(ph));
    vec2 z = vec2(0.0);
    float mit = 0.0;
    for(int mi = 0; mi < 17; mi++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + mc; if(dot(z, z) > 4.0) break; mit += 1.0; }
    v = mit / 17.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	vec2 q1 = p; vec2 q2 = p;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d = d1 * d2;
	vec3 col = vec3(0.83, 0.77, 0.23) * (0.13 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

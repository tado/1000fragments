uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.60 + jf * 4.0), cos(t * 0.45 * jf)) * 0.59;
        xs += sin(length(p - im) * 117.51 - t * 10.33 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.64 + time * 0.19, vec3(0.43, 0.54, 0.59), vec3(0.30, 0.44, 0.30), vec3(0.92, 0.79, 0.83), vec3(0.55, 0.28, 0.60));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.32));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
